// Que:- Am I perfect
// Solution is below

import java.util.Scanner;

public class Que1 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // Prompt the user to input a number
        System.out.print("Enter a number: ");
        int n = scanner.nextInt();
        int sum = 0;
        
        // Calculate the sum of proper divisors of the number
        for (int i = 1; i < n; i++) {
            if (n % i == 0) {
                sum += i;
            }
        }
        
        // Print the sum of proper divisors
        System.out.println("Sum of proper divisors: " + sum);
        
        // Determine if the number is Perfect, Abundant, or Deficient
        if (sum == n) {
            System.out.println("Perfect");
        } else if (sum > n) {
            System.out.println("Abundant");
        } else {
            System.out.println("Deficient");
        }
        
        // Close the scanner
        scanner.close();
    }
}
