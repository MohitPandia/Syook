//hide the pin


import java.util.ArrayList;
import java.util.Collections;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // Read the input decimal number
        int n = scanner.nextInt();
        String s = "";
        
        // Convert decimal to binary representation
        while (n > 0) {
            s += (char) (n % 2 + '0');  // Append the binary digit to the string
            n /= 2;
        }
        
        // Reverse the binary string to get the correct binary representation
        s = new StringBuilder(s).reverse().toString();
        int temp = Integer.parseInt(s); // Convert binary string back to integer
        System.out.println("Value in binary = " + temp);

        // Create an ArrayList to store the denominations
        ArrayList<Integer> ans = new ArrayList<>();
        
        // Convert the binary representation to denominations
        while (temp > 0) {
            if (temp >= 10000) {
                temp -= 10000;
                ans.add(10000);
            } else if (temp >= 1000) {
                temp -= 1000;
                ans.add(1000);
            } else if (temp >= 100) {
                temp -= 100;
                ans.add(100);
            } else if (temp >= 10) {
                temp -= 10;
                ans.add(10);
            } else if (temp >= 1) {
                temp -= 1;
                ans.add(1);
            }
        }
        
        boolean isReverse = false;
        if (ans.get(0) == 10000) {
            isReverse = true; // Check if the sequence starts with 10000
        }
        
        ArrayList<String> finalAns = new ArrayList<>();
        
        // Convert the denominations to their corresponding strings
        for (int i = 0; i < ans.size(); i++) {
            if (ans.get(i) == 10000) {
                continue; // Skip 10000
            } else if (ans.get(i) == 1000) {
                finalAns.add("fall" + ",");
            } else if (ans.get(i) == 100) {
                finalAns.add("hide your mints" + ",");
            } else if (ans.get(i) == 10) {
                finalAns.add("double rip" + ",");
            } else if (ans.get(i) == 1) {
                finalAns.add("pop" + ",");
            }
        }
        
        if (!isReverse) {
            Collections.reverse(finalAns); // Reverse the ArrayList if needed
        }
        
        // Print the final strings
        for (String item : finalAns) {
            System.out.println(item);
        }
        
        scanner.close();
    }
}
