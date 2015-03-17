from checkio_referee import RefereeCodeGolf

import settings
import settings_env
from tests import TESTS


class Referee(RefereeCodeGolf):
    DEFAULT_MAX_CODE_LENGTH = 200
    BASE_POINTS = 15
    TESTS = TESTS
    EXECUTABLE_PATH = settings.EXECUTABLE_PATH
    CURRENT_ENV = settings_env.CURRENT_ENV
    FUNCTION_NAME = "golf"
