def balance_paranthesis(s):
    stack=[]
    brackets={")":"(","]":"[","}":"{"}
    for i in s:
        if i in brackets.value():
            stack.append(i)
        elif i in brackets.keys():
            if not stack or stack.pop() !=brackets[i]:
                return False
    return len(stack)==0
s=input("Enter a string of paranthesis :")
if balance_paranthesis(s):
    print("Valid")
else:
    print("Invalid")