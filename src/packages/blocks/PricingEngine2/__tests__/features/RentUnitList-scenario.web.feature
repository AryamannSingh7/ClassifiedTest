Feature: RentPayment

    Scenario: User navigates to RentPayment Unit List
        Given I am a User loading RentPayment Unit List
        When I navigate to the RentPayment Unit List
        Then RentPayment will load with out errors Unit List
        Then I am able to click Back Button
        Then I am able to Move to Register Rent Payment Page
        Then Should load the Unit List
        Then I am able to click on Rent List page