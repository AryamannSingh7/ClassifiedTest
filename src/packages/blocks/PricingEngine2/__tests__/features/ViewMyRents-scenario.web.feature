Feature: RentPayment

    Scenario: User navigates to ViewMyRents
        Given I am a User loading ViewMyRents
        When I navigate to the ViewMyRents
        Then ViewMyRents will load with out errors