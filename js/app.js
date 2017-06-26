var $ = require("jquery");
$(document).ready(function() {
	console.log("jQuery loaded");
	
	$(".button").click(function() {
		//stack.push($(this).text());
		checkButton($(this).text());
		console.log(stack);
	});
	//find if item pushed is operator or operand
	//2 consecutive operators not acceptable
	//if number or . keep pushing into stack
	//Peek into stack if operator encountered
	//If operand the proceed if operator throw error
});

var operator = ["+", "-","x","÷", "%", ")" ,"("];
var stack = [];

function checkButton(button) {
		if (button == "AC") 
			{console.log("clear all");stack = [];}
		else if (button == "=") {
			//Now you evaluate the expression
			console.log("evaluate expression");
			console.log(stack);
			let bal = bracketsBalanced(stack);
			console.log("bracket bal", bal);
			let opBal = operatorsBalanced(stack);
			console.log("Op bal:", opBal);
			//stack=[];
			let p = toPostfix(stack);
			console.log("Postfix", p);
			let ans = evaluatePostfix(p);
			console.log("ans", ans);
			let exp = stringExp(stack)
			console.log(exp, eval(exp));
			stack=[];
		}
		else if (operand(button) && stack.length!=0) {
			//it can be number or .
			console.log(button);
			if (operand(peekStack(stack))){
				var num = stack.pop() + button;
				console.log(num);
				stack.push(num);
				}	
			else stack.push(button);
		}
		else stack.push(button);
	}

function operand(ele) {
	if (operator.indexOf(ele) == -1)
		return true;
	else return false;
}

function peekStack(stack) {
	var ele = stack.pop();
	stack.push(ele);
	return ele;
}

function bracketsBalanced(stack) {
	var brackets = [];
	for (let i=0;i<stack.length;i++) {
		//console.log(stack[i],brackets);
		if (stack[i] == '(')
			brackets.push(stack[i]);
		else if (stack[i] == ')') {
			if (brackets.length!==0) 
				brackets.pop();
			else 
				return false;
		}
	}
	if (brackets.length==0) return true;
	else return false;
}

function operatorsBalanced(stack) {
	let copy = stack.filter(ele => ele=="(" || ele==")" ?false:true);
	console.log(copy);
	//Should start with operand
	let flag = 'OPERAND';
	for (let i=0;i<copy.length;i++) {
		//check for flag
		let ele = operand(copy[i])?'OPERAND':'OPERATOR';
		if (ele!=flag)
			return false;
		else if (flag == 'OPERAND') 
			flag = 'OPERATOR';
		else flag = 'OPERAND'
	}
    if (flag=='OPERATOR')
    	return true;
    else return false;
}

function precedence(ele) {
	if (ele == "x" || ele == "÷" || ele == "%")
		return 3;
	else if (ele == "+" || ele == "-") 
		return 1;
}

function toPostfix(stack) {
	let P = [], st=[];//P for postFix expression. st is temp stack
	for (let i=0;i<stack.length;i++) {
		if (operand(stack[i])){
			P.push(stack[i]);
		}
		if (stack[i]=='(') {
			st.push(stack[i]);
		}
		if (stack[i]==')') {
			while (st.length!=0 && peekStack(st)!='(') {
				P.push(st.pop());
			}
			console.log("should be left paran",st.pop());
		}
		if(operand(stack[i])==false && stack[i]!='(' && stack[i]!=')') {
			console.log(stack[i], operand(stack[i]),"operator");
			if (st.length==0 || peekStack(st)=='(')
				st.push(stack[i]);
			else {
				while(st.length!=0 && peekStack(st)!='(' && precedence(stack[i])<precedence(peekStack(st))) {
					P.push(st.pop());
				}
				st.push(stack[i]);
			}
		}
	}
	while(st.length!=0) {
		P.push(st.pop());
	}
	return P;
}

function evaluatePostfix(P) {
	//This algo assumes it is a correct postfix expression
	//by the bracket check and operator checks, it should be
	let st=[]
	for (let i=0;i<P.length;i++) {
		if (operand(P[i])) 
			st.push(P[i]);
		else {
			//It will be an operator becuase at this stage no brackets
			let a = st.pop();
			let b = st.pop();
			let result = evaluateExp(parseFloat(a),parseFloat(b),P[i]);
			st.push(result);
		}
	}
	return st.pop();
}

function evaluateExp(a,b,op) {
	let ans=0;
	switch (op) {
		case '+':
		  ans = a+b;
		  break;
		case '-':
		  ans = a-b;
		  break;
		case 'x':
		  ans = a*b;
		  break;
		case '÷':
		  ans = a/b;
		  break;
		case '%':
		  ans = a%b;
		  break;
	}
	return ans;
}

function stringExp(stack) {
	let exp = stack.map(function(ele) {
		if (ele == 'x')
			return '*';
		if (ele == '÷')
			return '/';
		return ele
	}).join("");
	return exp;
}
//creating expression and doing eval so as to cross check 
//the result