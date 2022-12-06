Feature: AddEditExpense

    Scenario: User navigates to AddEditExpense
        Given I am a User loading AddEditExpense
        When I navigate to the AddEditExpense
        Then AddEditExpense will load with out errors
        And I can go back to expense listing
        And Expense Add form submit check