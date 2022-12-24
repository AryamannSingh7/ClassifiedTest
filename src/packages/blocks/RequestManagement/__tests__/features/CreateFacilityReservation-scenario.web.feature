Feature: CreateFacilityReservation

     Scenario: User navigates to CreateFacilityReservation
        Given I am a User loading CreateFacilityReservation
        When I navigate to the CreateFacilityReservation
        Then CreateFacilityReservation will load with out errors
        Then I can go back to Facility details page
       