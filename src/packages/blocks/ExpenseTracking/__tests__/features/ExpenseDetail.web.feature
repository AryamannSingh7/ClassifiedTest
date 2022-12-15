Feature: ExpenseDetail

    Scenario: User navigates to ExpenseDetail
        Given I am a User loading ExpenseDetail
        When I navigate to the ExpenseDetail
        Then ExpenseDetail will load with out errors
        And I can go back to expense details page
        And Should open delete dialog when click on delete button
        And Should close delete dialog when click on close button
        And Should go to my expense list

    Scenario: Delete Expense Details
        Given I am a User loading ExpenseDetail
        When ExpenseDetail loaded without error
        Then Should delete the expense details
        Then Should cancel delete the expense