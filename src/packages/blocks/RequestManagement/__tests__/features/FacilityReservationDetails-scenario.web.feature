Feature: FacilityReservationDetails

     Scenario: User navigates to FacilityReservationDetails
        Given I am a User loading FacilityReservationDetails
        When I navigate to the FacilityReservationDetails
        Then FacilityReservationDetails will load with out errors
        Then I can go back to Facility details page