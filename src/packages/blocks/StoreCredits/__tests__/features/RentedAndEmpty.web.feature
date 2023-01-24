Feature: RentedAndEmpty

    Scenario: User navigates to RentedAndEmpty
        Given I am a User loading RentedAndEmpty
        When I navigate to the RentedAndEmpty
        Then RentedAndEmpty will load with out errors
        Then Should load rent and empty unit data