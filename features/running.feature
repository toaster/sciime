Feature: Running sciime
  Scenario: User runs sciime
    Given a directory named "widgets"
    When I run `sciime start`
    Then the output should contain "Listening on 127.0.0.1:9876"

  Scenario: User runs sciime and the widgets directory is missing
    When I run `sciime start`
    Then the output should contain:
      """
      Please create a directory called "widgets". Thanks!
      """

  Scenario: User runs sciime with port option
    Given a directory named "widgets"
    When I run `sciime start -p 6789`
    Then the output should contain "Listening on 127.0.0.1:6789"

  Scenario: User runs sciime with host option
    Given a directory named "widgets"
    When I run `sciime start -h 0.0.0.0`
    Then the output should contain "Listening on 0.0.0.0:9876"

  Scenario: User runs sciime with host and port option
    Given a directory named "widgets"
    When I run `sciime start -h 0.0.0.0 -p 6789`
    Then the output should contain "Listening on 0.0.0.0:6789"

  Scenario: User runs sciime with help option
    Given a directory named "widgets"
    When I run `sciime --help`
    Then the output should contain "--help                       Display this screen"
