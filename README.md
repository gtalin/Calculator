# Calculator
Calculator project fcc
Converted expression from infix to postfix and evaluated that.
Infix to postfix [algo](http://faculty.cs.niu.edu/~hutchins/csci241/eval.htm)
Checked for left and right bracket balance.
Checked for operator and operand balance.
Probably should've used some way to check if the postfix expression is valid.
Converted exp to string and used eval to cross check my answers. 

### June 27, 2017
**Thoughts and learnings:**
* To give a kind of 3-d effect, used gradient and box shadow for buttons (colors look more natural with  gradient)
* Box shadow for the whole calculator as well. For the calculator body, a border, box shadow normal and inset, used both to give a 3D kind of effect.
* Took quite some time selecting color for the body of the calculator and buttons, as well as for it's border.
* If we want inset box shadow along with normal box shadow, we have to follow syntax:
box-shadow: 0px 2px 0px black, black 0px 0px 5px inset; 
Otherwise the syntax for inset is:
box-shadow: inset 0px 2px 0px black;
* Reminder: in 0px 0px 1px 2px black 1st 2 numbers are displacement of shadow. 3rd is blur (ie. whether the shadow is sharp or not) and the 4th number (which is omitted many tims) is spread of the shadow (just the spread without affecting the bluriness of the shadow)
The shadows are with the assumption that the light is falling from upper part (or even from top) but not from left or right. 

Spent quite a lot of time in the appearance of the calculator. 
