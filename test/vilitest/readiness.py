
import numpy as np

# Sample data: Historical HRV measurements and a new measurement
historical_hrv = [58, 55,70 ,34 , 76 ,66 ,62, 67]  # Historical HRV data
new_measurement = 50  # New HRV measurement

# Combine historical and new measurements
all_measurements = historical_hrv + [new_measurement]

# Calculate the mean and standard deviation of HRV values
mean_hrv = np.mean(all_measurements)
std_dev_hrv = np.std(all_measurements)

# Calculate Z-scores for the new measurement
z_score = (new_measurement - mean_hrv) / std_dev_hrv if std_dev_hrv != 0 else 0

# Define categories based on Z-scores using the specified thresholds
if z_score < -0.8416:  # Corresponds to the bottom 20% in a normal distribution
    readiness_index = 'LOW'
elif z_score > 0.8416:  # Corresponds to the top 20%
    readiness_index = 'HIGH'
else:
    readiness_index = 'NORMAL'

print (z_score)
print(readiness_index)
