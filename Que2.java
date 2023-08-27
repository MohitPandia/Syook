// Que:- How many trials to reach 1
// Solution is below

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // Prompt the user to input a starting number
        System.out.print("Enter a number: ");
        int x = scanner.nextInt();

        int count = 0; // Initialize the count of trials
        
        // Perform operations until x becomes 1
        while (x != 1) {
            if (x % 2 == 0) {
                x /= 2; // If x is even, divide by 2
            } else {
                x = x * 3 + 1; // If x is odd, multiply by 3 and add 1
            }
            count++; // Increment the trial count
        }
        
        // Print the number of trials required to reach 1
        System.out.println("Number of trials: " + count);
        
        // Close the scanner
        scanner.close();
    }
}
