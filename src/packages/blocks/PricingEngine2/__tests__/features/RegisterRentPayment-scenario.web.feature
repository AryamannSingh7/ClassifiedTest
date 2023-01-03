Feature: RentPayment

    Scenario: User navigates to Register Rent payment
        Given I am a User loading Register Rent payment
        When I navigate to the Register Rent payment
        Then Register Rent payment will load with out errors
        Then I am able to click Back Button
        Then Should load the Building List Dropdown
        Then Should Select Month From Dropdown
        Then Should Select Building List From Dropdown
        Then Should Select Unit List From Dropdown
        Then get Building List API Call Should be pass
        Then get Unit List API Call Should be pass
        Then Should load the Unit List  Dropdown