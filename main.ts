import { readFile } from 'fs';

import {
  eventLoopStatusTYPE,
  callStackStatusType,
  callStackTYPE,
  setTimeoutFunctionTYPE,
  postMethodArgumentsType,
} from './main.types';

const COUNT: number = 163840;

function getNanoSecTime() {
  var hrTime = process.hrtime();
  return hrTime[0] * 1000000000 + hrTime[1];
}

const print = (args: string | string[]) => {
  return new Promise((resolve, reject) => {
    try {
      if (typeof args === 'object') {
        resolve(args.join(' '));
      }
      resolve(args);
    } catch (error) {
      reject(error);
    }
  });
};

const palindrom = (args: Array<any> | string) => {
  return new Promise((resolve, reject) => {
    try {
      let result: string;
      if (typeof args === 'object') {
        result = args.join('') + args.reverse().join('');
      }
      if (typeof args === 'string') {
        result = args + args.split('').reverse().join('');
      }
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

const setTimeoutFunc = ({ timer, func }: setTimeoutFunctionTYPE) => {
  function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return new Promise(async (resolve, reject) => {
    try {
      setTimeout(func, timer);
      await timeout(timer);
    } catch (error) {
      reject(error);
    } finally {
      resolve('success');
    }
  });
};

const commandMatch = {
  palindrom: palindrom,
  setTimeoutFunc: setTimeoutFunc,
  print: print,
};

class EventLoop {
  private status: eventLoopStatusTYPE = 'closed';
  private callStack: callStackTYPE = null;
  private callStackStatus: callStackStatusType = null;

  private startDate: any;
  private endDate: any;

  public start(): void {
    this.status = 'opened';
    this.startDate = getNanoSecTime();

    console.log(`[Event Loop] *opened* | ${new Date().toISOString().substr(11, 8)}`);
  }

  private checkCallStack(): void {
    const { callStack } = this;

    if (!callStack || callStack.length === 0) return;

    while (callStack.length !== 0) {
      const inputCommand = callStack.shift();

      const callingFunction = commandMatch[inputCommand.command];

      if (!this.callStackStatus) this.callStackStatus = [];
      this.callStackStatus.push('pending');

      callingFunction(inputCommand.args).then((result) => {
        console.log(
          `[Event Loop] command : ${
            inputCommand.command
          } , arguments: ${inputCommand.args.toString()}, RESULT: ${result} | ${new Date()
            .toISOString()
            .substr(11, 8)}`
        );

        this.callStackStatus[this.callStackStatus.indexOf('pending')] = 'completed';
        if (!this.callStackStatus.includes('pending')) {
          this.awaitFinish();
        }
      });
    }
  }

  public awaitFinish(): void {
    if (
      (!this.callStack || this.callStack.length === 0) &&
      (!this.callStackStatus || !this.callStackStatus.includes('pending'))
    ) {
      this.status = 'closed';
      this.endDate = getNanoSecTime();
      console.log(`[Event Loop] *finished* | ${new Date().toISOString().substr(11, 8)}`);
      console.log(this.endDate, this.startDate);
      console.log(
        `Process that contains ${COUNT} operations ends in ${
          this.endDate - this.startDate
        } ns.\nAverage time of one operation: ${(this.endDate - this.startDate) / COUNT} ns`
      );
    }
  }

  public post({ command, args }: postMethodArgumentsType): void {
    const { status } = this;

    if (status === 'closed') {
      throw new Error('Event loop is not running. Before post command use Start() method');
    }

    if (!Object.keys(commandMatch).includes(command)) {
      throw new Error(`command: ${command} doesnt exist`);
    }

    if (!this.callStack) {
      this.callStack = [];
    }
    this.callStack.push({ command, args });

    this.checkCallStack();
  }
}

const main = async () => {
  const eventLoop = new EventLoop();
  eventLoop.start();

  readFile('./commands.txt', 'utf8', (err, data) => {
    if (err) {
      throw new Error(err.toString());
    }

    const commandsArray = data.split('\r\n');
    commandsArray.forEach((item) => {
      const splittedItem = item.split(' ');
      const command = splittedItem.shift();

      if (!Object.keys(commandMatch).includes(command)) return;

      const countArray = new Array(COUNT).fill(null);
      countArray.forEach(() => {
        eventLoop.post({
          command,
          args: splittedItem.length === 1 ? splittedItem[0] : splittedItem,
        });
      });
    });

    eventLoop.awaitFinish();
  });
};

main();
