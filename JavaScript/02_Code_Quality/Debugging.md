# Debugging
- It is process of finding and fixing errors within a script

## "Sources" panel
- Sources panel is basically contain information of our application
- there are 3 parts
    1. File Navigation - HTML, CSS, JS file list. Also including images that are attached to the page
    2. Code Editor - show source code
    3. JS Debugging - for Debugging
 
## Console
- We can type commands there and press Enter to execute. After a statement is executed, its result is shown below.

## Breakpoint
- Breakpoint is inside a source panel in browser
- Breakpoint looks like blue flage
- breakpoint is a point of code that automatically pause JS execution if there we put the breakpoint.
- allow us to quickly jump to the breakpoint in the code.
- Right click on the line number allows to create a conditional breakpoint. It only triggers when the given expression, that you should provide when you create it, is truthy.

## Debugger
- we can also pause code using `debugger` command in code.
- this command work only development tool is open

## Pause and look around
- They allow you to examine the current code state:
    1. Watch - shows current values for any expressions.
    2. Call Stack - shows the nested calls chain.
    3. Scope - current variables.

## Tracing the Execution
- to Trac any process there are a many buttons
    1. `Resume`: continue the execution, hotkey `F8`
    2. `Step`: run the next command, hotkey `F9`
    3. `Step over`: run the next command, but don’t go into a function, hotkey `F10`
    4. `Step into`, hotkey `F11`
    5. `Step out`: continue the execution till the end of the current function, hotkey `Shift+F11`
    6. enable/disable all breakpoints.
    7. enable/disable automatic pause in case of an error.