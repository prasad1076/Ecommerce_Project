arr = [1,5,78,4,98,0,2,33,101,44];

const findMaxnum = (num) => {
    for (let i = 0; i < num.length; i++) {
        for (let j = 0; j < num.length - i - 1; j++) {
            if (num[j] > num[j + 1]) {  // Swap if the current element is greater than the next element
                let temp = num[j];
                num[j] = num[j + 1];
                num[j + 1] = temp;
            }
        }
    }
    return num[num.length - 1];  // Return the max number (last element in sorted array)
}
const maxNum = findMaxnum(arr);
console.log(maxNum);