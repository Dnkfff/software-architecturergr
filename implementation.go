package lab2

import (
	"errors"
	"fmt"
	"regexp"
	"strings"
)

const CARET = "^"
const PLUS = "+"
const MINUS = "-"
const MULTIPLY = "*"
const DIVISION = "/"
const LEFT_BRACKET = "("
const RIGHT_BRACKET = ")"

func stringIsValid(inputString string) bool {
	const regex = `[0-9/\*\^\+\-\(\)]`
	trimString := strings.TrimSpace(inputString)
	arrayFromString := strings.Split(trimString, "")

	var stringIsValid bool = true

	for _, val := range arrayFromString {
		matched, _ := regexp.MatchString(regex, string(val))
		if !matched {
			stringIsValid = false
		}
	}

	return stringIsValid
}

// check if string is number
func stringIsNumber(input string) bool {
	const regex = `[0-9]`
	matched, _ := regexp.MatchString(regex, string(input))

	return matched
}

// check if string is operator
func stringIsOperator(input string) bool {
	const regex = `[\+\-\/\*\^]`

	matched, _ := regexp.MatchString(regex, string(input))

	return matched
}

func isPriorityHigher(a string, b string) bool {
	if a == CARET && b != CARET {
		return true
	} else if (a == MULTIPLY || a == DIVISION) && b != MULTIPLY && b != DIVISION && b != CARET {
		return true
	} else {
		return false
	}
}

// translate string to special array
func arrayFromString(input string) []string {
	sampleArray := strings.Split(input, "")

	var result []string

	var temporary string = ""
	for i := 0; i < len(sampleArray); i++ {
		val := sampleArray[i]
		var nextVal string
		if i != len(sampleArray)-1 {
			nextVal = sampleArray[i+1]
		} else {
			nextVal = ""
		}

		if stringIsNumber(val) {
			temporary = temporary + string(val)
			if nextVal == "" || !stringIsNumber(nextVal) {
				result = append(result, temporary)
				temporary = ""
			}
		} else {
			result = append(result, val)
		}
	}
	return result
}

func ExpressionToPostfix(input string) (string, error) {

	// check if string is correct
	stringIsValid := stringIsValid(input)

	if input == "" || input == " " {
		return "", errors.New("empty string")
	}

	if !stringIsValid {
		return "_", fmt.Errorf("the string is invalid")
	}

	// algoritm start
	var stack []string
	var queue []string

	array := arrayFromString(input)

	fmt.Println(array)

	for _, val := range array {
		if stringIsNumber(val) {
			queue = append(queue, val)
			// if element is number
		} else if stringIsOperator(val) {
			// if element equals operator +-/*
			if len(stack) == 0 || stack[len(stack)-1] == "(" {
				stack = append(stack, val)
				// & stack is empty || stack have the last element - "("
			} else if len(stack) != 0 && isPriorityHigher(val, stack[len(stack)-1]) {
				stack = append(stack, val)
				// if input operator is higher than last in stack
			} else if len(stack) != 0 && !isPriorityHigher(val, stack[len(stack)-1]) {
				i := len(stack) - 1
				for i >= 0 && (!isPriorityHigher(stack[len(stack)-1], val) || stack[len(stack)-1] != "(") {
					x := stack[i]
					stack = stack[:i]
					queue = append(queue, x)
					i--
				}
				stack = append(stack, val)
				// if input operator is same or smaller priority than last in stack
			}
		} else if val == LEFT_BRACKET {
			stack = append(stack, val)
			// if input value === "("
		} else if val == RIGHT_BRACKET {
			i := len(stack) - 1
			for i >= 0 && stack[len(stack)-1] != "(" {
				x := stack[i]
				stack = stack[:i]
				queue = append(queue, x)
				i--
			}
			if len(stack) != 0 {
				stack = stack[:i]
			}
			// if input value === ")"
		}
	}

	i := len(stack) - 1
	for len(stack) != 0 {
		x := stack[i]
		stack = stack[:i]
		queue = append(queue, x)
		i--
	}
	// push other stack elements into queue

	resultString := strings.Join(queue, " ")
	fmt.Println(resultString)
	return resultString, nil
}
