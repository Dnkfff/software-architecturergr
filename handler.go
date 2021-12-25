package lab2

import (
	"bufio"
	"io"
)

// ComputeHandler should be constructed with input io.Reader and output io.Writer.
// Its Compute() method should read the expression from input and write the computed result to the output.
type ComputeHandler struct {
	Input  io.Reader
	Output io.Writer
}

func (ch *ComputeHandler) Compute() error {
	fileScanner := bufio.NewScanner(ch.Input)

	for fileScanner.Scan() {
		input := fileScanner.Text()
		res, err := ExpressionToPostfix(input)
		if err != nil {
			return err
		}
		ch.Output.Write([]byte(res))
	}

	return nil
}
