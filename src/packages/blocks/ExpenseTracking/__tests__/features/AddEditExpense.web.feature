Feature: AddEditExpense

    Scenario: User navigates to AddEditExpense
        Given I am a User loading AddEditExpense
        When I navigate to the AddEditExpense
        Then AddEditExpense will load with out errors
        And Should go back to expense listing when Add Expense
        And Should go back to unit expense listing when Add Expense
        And Should go back to Expense Details when Edit Expense
        And Should load the expense category
        And Should load the building list
        And Should load the Expense details when edit

    Scenario: Expense Form
        Given I am a User loading AddEditExpense
        When ExpenseDetail loaded without error
        Then Should Add expense when submit
        Then Should Edit expense when submit
        Then Should load the unit list