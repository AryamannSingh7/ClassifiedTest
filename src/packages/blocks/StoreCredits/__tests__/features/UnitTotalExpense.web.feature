Feature: UnitTotalExpense

    Scenario: User navigates to UnitTotalExpense
        Given I am a User loading UnitTotalExpense
        When I navigate to the UnitTotalExpense
        Then UnitTotalExpense will load with out errors
        And Should open filter dialog when click on filter button
        And Should close filter dialog when click on close button
        And Should load the expense category list
        And Should load the unit details
        And Should load the unit expense list
        And Should Clear the applied filter
        And Should apply the filter
        And Should add selected category id into list when checked
        And Should remove selected category id into list when unchecked