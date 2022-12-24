Feature: ManagerFacilityReservation

     Scenario: User navigates to ManagerFacilityReservation
        Given I am a User loading ManagerFacilityReservation
        When I navigate to the ManagerFacilityReservation
        Then ManagerFacilityReservation will load with out errors
        Then I can go back to Facility details page