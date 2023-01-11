Feature: OwnerComplex

    Scenario: User navigates to OwnerComplex
        Given I am a User loading OwnerComplex
        When I navigate to the OwnerComplex
        Then OwnerComplex will load with out errors
        And Should load the complex details
        And Should go to respective dashboard when click on back button