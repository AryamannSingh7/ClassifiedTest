Feature: PropertyManagerList

    Scenario: User navigates to PropertyManagerList
        Given I am a User loading PropertyManagerList
        When I navigate to the PropertyManagerList
        Then PropertyManagerList will load with out errors

    Scenario: Property Manager List and New Request Number
        Given I am a User loading PropertyManagerList
        When PropertyManagerList load without error
        Then Should show property manager list in web
        And NewRequest load without error
        And Should delete the property manager
        And Should update the property manager list when click on sort