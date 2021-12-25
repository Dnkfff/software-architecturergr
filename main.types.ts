export type openedType = 'opened';
export type closedType = 'closed';
export type eventLoopStatusTYPE = openedType | closedType;

export type completedType = 'completed';
export type pendingType = 'pending';
export type callStackStatusType = (completedType | pendingType)[] | null;

export type postMethodArgumentsType = {
  command: string;
  args: any;
};

export type setTimeoutFunctionTYPE = {
  timer: number;
  func: any;
};

export type callStackTYPE = null | Array<postMethodArgumentsType>;
