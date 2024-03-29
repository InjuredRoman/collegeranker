# Debt and Income at 10 years averaged... 0.1*P10 + 0.4*P25 + 0.4*P75 + 0.1*P90

import numpy as np
from .utilities import getBalancedScore
def summary():
    return '''
    A quantification of financial outcomes considering averaged debt and incomes 10 years after graduation
    '''
def compute(weighted_income: float, weighted_debt: float):
    if (np.isnan(weighted_income) or np.isnan(weighted_debt)):
        return np.nan
    return .5*weighted_debt + .5*weighted_income
def compute_on_row(row, extraInfo):
    if (type(extraInfo) == type(None)):
        return np.nan
    weighted_income = getBalancedScore('weighted_income', extraInfo)
    weighted_debt = getBalancedScore('weighted_debt', extraInfo)
    # weighted_income = .4*extraInfo['weighted_income_relative'] + .6*extraInfo['weighted_income_absolute']
    # weighted_debt = .4*extraInfo['weighted_debt_relative'] + .6*extraInfo['weighted_debt_absolute']
    return compute(
        weighted_income, weighted_debt
    )