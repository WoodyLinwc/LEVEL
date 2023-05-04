import csv
import os
import sklearn
from sklearn.metrics import mean_squared_error
import nltk
import json
import numpy as np


LEV1_GT_FILE = 'ADMIN_metadata.csv'
LEV2_GT_FILE = '2ADMIN_metadata.csv'
LEV3_GT_FILE = '3ADMIN_metadata.csv'


def read_labels(filename):
    labels = {}

    with open(filename, 'r') as f:
        csvr = csv.reader(f, delimiter=',', quotechar='"')
        for r in csvr:

            if r[-1] == 'label' or r[-1] == 'pred_label' or r[-1] == 'predict':
                # ignore header
                continue

            labels[r[0]] = r

    return labels


def compare(gt_value, pred_value):
    is_array = False

    if gt_value.startswith('['):
        # parse array
        is_array = True
        gt_value = [float(v) for v in gt_value[1:-1].split(',')]
    else:
        gt_value = [float(gt_value)]

    if pred_value.startswith('['):

        if not is_array:
            # penalize
            return 1000000

        # parse array
        try:
            pred_value = [float(v) for v in pred_value[1:-1].split(',')]
        except:
            pred_value = []

        if len(gt_value) != len(pred_value):
            return 1000000

    else:

        if is_array:
            # penalize
            return 1000000

        pred_value = [float(pred_value)]

    #     try:
    rmse = mean_squared_error(gt_value, pred_value, squared=False)
    #     except:
    #         print(gt_value, pred_value)

    return rmse


def is_float(value):
    try:
        float(value)
        return True
    except:
        return False


def compare3(gt_value, pred_value):
    error = 0

    if pred_value == '':
        return 1000000

    if gt_value == 'Yes' or gt_value == 'No':
        if gt_value != pred_value:
            error += 1

    elif is_float(gt_value):

        error += mean_squared_error([float(gt_value)], [float(pred_value)], squared=False)

    else:

        # Levenstein edit distance
        error += nltk.edit_distance(gt_value, pred_value)

    return error


def compare_many(gt_values, pred_values, lev3=False):
    errors = []

    for i, v in enumerate(gt_values.keys()):

        if not v in pred_values:
            error = 1000000
        else:

            if lev3:
                error = compare3(gt_values[v][-1], pred_values[v][-1])
            else:
                error = compare(gt_values[v][-1], pred_values[v][-1])

        errors.append(error)

    return np.mean(errors)

lev1_gt = read_labels(LEV1_GT_FILE)
lev2_gt = read_labels(LEV2_GT_FILE)
lev3_gt = read_labels(LEV3_GT_FILE)

LEV1_SUB_FILE = 'lev1_TEST_metadata.csv'
LEV2_SUB_FILE = 'lev2_TEST_metadata.csv'
LEV3_SUB_FILE = 'lev3_TEST_metadata.csv'
SUBMISSIONS_DIR = 'SUBMISSIONS/'

submissions = os.listdir(SUBMISSIONS_DIR)

all_results = []  # List to store the results for all submissions

for s in submissions:

    print('SUBMISSION BY', s)

    results = {}  # Dictionary to store the results for the current submission

    lev1_sub_file = os.path.join(SUBMISSIONS_DIR, s, LEV1_SUB_FILE)
    lev2_sub_file = os.path.join(SUBMISSIONS_DIR, s, LEV2_SUB_FILE)
    lev3_sub_file = os.path.join(SUBMISSIONS_DIR, s, LEV3_SUB_FILE)

    results['team'] = s

    if os.path.exists(lev1_sub_file):
        lev1_sub_labels = read_labels(lev1_sub_file)
        mean_rmse = compare_many(lev1_gt, lev1_sub_labels)
        print('LEVEL 1 mean RMSE:', mean_rmse)
        results['level_1_mean_rmse'] = mean_rmse

    if os.path.exists(lev2_sub_file):
        lev2_sub_labels = read_labels(lev2_sub_file)
        mean_rmse = compare_many(lev2_gt, lev2_sub_labels)
        print('LEVEL 2 mean RMSE:', mean_rmse)
        results['level_2_mean_rmse'] = mean_rmse

    if os.path.exists(lev3_sub_file):
        lev3_sub_labels = read_labels(lev3_sub_file)
        mean_err = compare_many(lev3_gt, lev3_sub_labels, lev3=True)
        print('LEVEL 3 mean ERROR:', mean_err)
        results['level_3_mean_error'] = mean_err

    all_results.append(results)

# Write the results to a JSON file
with open('json/new.json', 'w') as json_file:
    json.dump(all_results, json_file, indent=4)