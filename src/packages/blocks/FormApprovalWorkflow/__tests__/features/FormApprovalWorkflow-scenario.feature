Feature: FormApprovalWorkflow

    Scenario: User navigates to FormApprovalWorkflow
        Given I am a User loading FormApprovalWorkflow
        When I navigate to the FormApprovalWorkflow
        Then FormApprovalWorkflow will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors