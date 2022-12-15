Feature: MyExpenseList

    Scenario: User navigates to MyExpenseList
        Given I am a User loading MyExpenseList
        When I navigate to the MyExpenseList
        Then MyExpenseList will load with out errors
        And Should open filter dialog when click on filter button
        And Should close filter dialog when click on close button
        And Should go back to owner dashboard
        And Should go to add expense page

    Scenario: My Empty Unit Expense List
        Given I am a User loading My Unit Expense List
        When My Unit Expense List is Empty
        Then Should show Empty list in web

    Scenario: My Unit Expense List
        Given I am a User loading My Unit Expense List
        When My Unit Expense List is not Empty
        Then Should show unit list in web

    Scenario: Filter on My Unit Expense List
        Given I am a User loading My Unit Expense
        When Building and Unit list is loading
        Then Should show building list in filter
        And Should Clear the applied filter
        And Should apply the filter