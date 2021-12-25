package lab2

import (
	"fmt"
	"testing"
)

var expRes string

var a = [5]string{
	"100+100",
	"100*100+2",
	"(100*100)+(2*4)(3+2)",
	"(123-123)^6*(56-22)",
	"5+(4-2)*3",
}

func BenchmarkExpressionToPostfixTest(b *testing.B) {
	for i := 0; i < 5; i++ {
		var exp string = ""
		exp = a[i]
		b.Run(fmt.Sprintf("test"), func(b *testing.B) {
			expRes, _ = ExpressionToPostfix(exp)
		})
	}
}
