/*
We define a magic square to be an  matrix of distinct positive integers from  to  where the sum of any row, column, or diagonal of length  is always equal to the same number: the magic constant.

You will be given a  matrix  of integers in the inclusive range . We can convert any digit  to any other digit  in the range  at cost of . Given , convert it into a magic square at minimal cost. Print this cost on a new line.

Note: The resulting magic square must contain distinct integers in the inclusive range .

For example, we start with the following matrix :
For example, we start with the following matrix :

5 3 4
1 5 8
6 4 2
We can convert it to the following magic square:

8 3 4
1 5 9
6 7 2

This took three replacements at a cost of |5-8|+|8-9|+|4-7| = 7
Sample Input 0

4 9 2
3 5 7
8 1 5
Sample Output 0

1

Explanation 0

If we change the bottom right value, , from  5 to 6 at a cost of |6 - 5| = 1,  becomes a magic square at the minimum possible cost.
----------------------
Sample Input 1

4 8 2
4 5 7
6 1 6
Sample Output 1

4

Explanation 1

Using 0-based indexing, if we make

-> at a cost of |9 - 8| = 1
-> at a cost of |3 - 4| = 1
-> at a cost of |8 - 6| = 2 ,
then the total cost will be 1 + 1 + 2 = 4.
*/

//-----------------------------------------------------------------------
/*
EXPLANATION

I must admit that this problem actually took me a good while to solve. Once you have the right insight on forming a magic Square it is really straight forward.
But until that point I was just stuck. Anyway, before rambling on lets get to the actual problem.

I started out with the idea that I could go through the square and change the number one by one based on an evaluation of the individual digits.
But I realized from the second example that in some of the cases multiple numbers needed to be changed in order to which meant that I couldn't just evaluate the individual digits to see if it should be changed.
 
Checking all possibilities for forming a magic square

Back to the drawing board.  I thought of checking all combinations but on the outset there was 9! = 362.880 possible solutions. What did I know about forming a magic square? 
I know that the so called magic constant has to be 15, so 5 have to be placed in the middle, which reduces the combinations to  8! = 40.320 a lot better.

That was when it dawned on me, that in order to make every sum crossing the center the pairs would be {1,9}, {2,8}, {3,7} and {4,6}, which means I just had to place 1-4 and the rest was given. 
that could be done in 876*5 = 1680. Possibly something I could brute force. However, I knew that not all of those 1680 solutions would be valid. As an example if I put 1 in the upper left corner I could not put 2 and 3 in the top row. 
Which meant I had to consult google. It turns out there are only 8 possible solutions to the problem as given on the blog post on

That should be rather easy to bruteforce. 
Just check the difference between the numbers in the given input and the 8 possible solutions and then take the smallest of those.
const n = [
            [8, 1, 6, 3, 5, 7, 4, 9, 2],
            [6, 1, 8, 7, 5, 3, 2, 9, 4],
            [4, 9, 2, 3, 5, 7, 8, 1, 6],
            [2, 9, 4, 7, 5, 3, 6, 1, 8],
            [8, 3, 4, 1, 5, 9, 6, 7, 2],
            [4, 3, 8, 9, 5, 1, 2, 7, 6],
            [6, 7, 2, 1, 5, 9, 8, 3, 4],
            [2, 7, 6, 9, 5, 1, 4, 3, 8]
        ]
*/

function formingMagicSquare(s) {
    let allsum = []
    // the magic is here 
    let dictionary =[
            [8, 1, 6, 3, 5, 7, 4, 9, 2],
            [6, 1, 8, 7, 5, 3, 2, 9, 4],
            [4, 9, 2, 3, 5, 7, 8, 1, 6],
            [2, 9, 4, 7, 5, 3, 6, 1, 8],
            [8, 3, 4, 1, 5, 9, 6, 7, 2],
            [4, 3, 8, 9, 5, 1, 2, 7, 6],
            [6, 7, 2, 1, 5, 9, 8, 3, 4],
            [2, 7, 6, 9, 5, 1, 4, 3, 8]]
    let flat = []

    for(let i = 0 ; i < s.length ; i++){
        for(let j = 0 ; j < s[i].length ; j++){
            flat.push(s[i][j])
        }
    }

    for(let i = 0 ; i < dictionary.length ; i ++){
    let temp = []
    for(let j = 0 ; j < dictionary[i].length ; j ++){
        let sum = Math.abs(flat[j] - dictionary[i][j])
        temp.push(sum)
    }
    allsum.push(temp)
    }

    let min = []
    for(let i = 0 ; i < allsum.length ; i++){
        let sum = allsum[i].reduce((acc,curr)=> acc+curr)
        min.push(sum)
    }

    let minSort = min.sort((a,b)=> a - b )

    return (minSort[0])
}

console.log(formingMagicSquare([[4, 9, 2], [3, 5, 7], [8, 1, 5]]))
// formingMagicSquare()
// formingMagicSquare()
// formingMagicSquare()

