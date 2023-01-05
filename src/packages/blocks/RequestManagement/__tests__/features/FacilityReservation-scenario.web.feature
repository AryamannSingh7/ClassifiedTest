Feature: FacilityReservation

     Scenario: User navigates to FacilityReservation
        Given I am a User loading FacilityReservation
        When I navigate to the FacilityReservation
        Then FacilityReservation will load with out errors
        Then I can go back to Facility details page
        Then Should facility have five Card 
        Then Should open Facility when click on card
        Then Should go to create facility pages when click on book facility button
        Then Should load the facility ReservationList count
        Then should check componentDidMount