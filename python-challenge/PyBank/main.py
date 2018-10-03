import os
import csv
file_path = 'C:/Users/hudas/OneDrive/Documents/GW Data Analytics Bootcamp/GWARL201808DATA3/03-Python/Homework/Instructions/PyBank/Resources'
budget_data = os.path.join(file_path, 'budget_data.csv')

total_months = 0
total_net = 0
present_month = 0
past_month = 0
rev_change = 0
rev_change_list = []
months = []


with open(budget_data) as datafile:
    csvreader = csv.reader(datafile)
    
    header=next(csvreader)
    
    for row in csvreader:
        total_months = total_months + 1
        months.append(row[0])
        present_month = int(row[1])
        total_net = total_net + present_month
        
        if total_months > 1:
         rev_change = present_month - past_month
         rev_change_list.append(rev_change)
         
        past_month = present_month


sum_rev_change = sum(rev_change_list)
average_change = round(sum_rev_change / (total_months - 1),2)
max_change = max(rev_change_list)
min_change = min(rev_change_list)
max_month_index = rev_change_list.index(max_change)
min_month_index = rev_change_list.index(min_change)
max_month = months[max_month_index]
min_month = months[min_month_index]


print("Financial Analysis")
print("----------------------------------------")
print(f"Total Months: {total_months}")
print(f"Total Revenue: ${total_net}")
print(f"Average Revenue Change: ${average_change}")
print(f"Greatest Increase in Revenue: {max_month} (${max_change})")
print(f"Greatest Decrease in Revenue: {min_month} (${min_change})")

with open("Financial Analysis.txt","w") as txtfile:
    txtfile.write("Financial Analysis \n")
    txtfile.write("-------------------------------------------- \n")
    txtfile.write("Total Months: " + str(total_months) + "\n")
    txtfile.write("Total Revenue: $" + str(total_net) + "\n")
    txtfile.write("Average Revenue Change: $" + str(average_change) + "\n")
    txtfile.write("Greatest Increase in Revenue: " + max_month + " ($" + str(max_change) + ")" + "\n")
    txtfile.write("Greatest Decrease in Revenue: " + min_month + " ($" + str(min_change) + ")" + "\n")
        


