Feature: UnitExpenseList

    Scenario: User navigates to UnitExpenseList
        Given I am a User loading UnitExpenseList
        When I navigate to the UnitExpenseList
        Then UnitExpenseList will load with out errors
        And Should open filter dialog when click on filter button
        And Should close filter dialog when click on close button
        And Should go back to My unit expense list
        And Should go to add expense page

    Scenario: Expense list and Unit Details
        Given I am a User loading UnitExpenseList
        When Getting details of unit
        Then My Expense List is not Empty and should show in web
        And Should go to Expense Detail page

    Scenario: Filter on My Expense List
        Given I am a User loading My Expense
        When Expense Category is loading
        Then Should show category list in filter
        And Should Clear the applied filter
        And Should apply the filter