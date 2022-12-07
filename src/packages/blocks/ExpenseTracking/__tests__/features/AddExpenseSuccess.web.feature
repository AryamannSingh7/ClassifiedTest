Feature: AddExpenseSuccess

    Scenario: User navigates to AddExpenseSuccess
        Given I am a User loading AddExpenseSuccess
        When I navigate to the AddExpenseSuccess
        Then AddExpenseSuccess will load with out errors
        And I can go back to expense listing
        And I can go back to expense listing through okay