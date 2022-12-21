Feature: RentPayment

    Scenario: User navigates to Rent Details
        Given I am a User loading Rent Details
        When I navigate to the Rent Details
        Then Rent Details will load with out errors