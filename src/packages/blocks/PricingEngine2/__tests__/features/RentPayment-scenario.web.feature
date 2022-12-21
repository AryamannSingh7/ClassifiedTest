Feature: RentPayment

    Scenario: User navigates to RentPayment
        Given I am a User loading RentPayment
        When I navigate to the RentPayment
        Then RentPayment will load with out errors
        Then I am able to click Back Button
        Then I am able to Move to Register Rent Payment Page
        Then Should load the Building List
        Then I am able to click on Unit List page
        Then I am able to click on Map Link