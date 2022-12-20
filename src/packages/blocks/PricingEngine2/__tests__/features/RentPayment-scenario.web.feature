Feature: RentPayment

    Scenario: User navigates to RentPayment
        Given I am a User loading RentPayment
        When I navigate to the RentPayment
        Then RentPayment will load with out errors
        Then I am able to click Back Button