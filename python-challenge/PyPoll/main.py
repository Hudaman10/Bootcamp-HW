import os
import csv

file_path = 'C:/Users/hudas/OneDrive/Documents/GW Data Analytics Bootcamp/GWARL201808DATA3/03-Python/Homework/Instructions/PyPoll/Resources'
election_data = os.path.join(file_path, 'election_data.csv')

total_votes = 0
candidate = ""
votes = {}
percentagesc ={}
votesforwinner = 0
winner = ""



with open(election_data) as csvfile:
    csvreader = csv.reader(csvfile, delimiter=",")

    next(csvreader)

    
    for row in csvreader:
        total_votes = total_votes + 1
        candidate = row[2]
        if candidate in votes:
            votes[candidate] = votes[candidate] + 1
        else:
            votes[candidate] = 1


for person, vote_count in votes.items():
    percentagesc[person] = '{0:.0%}'.format(vote_count / total_votes)
    if vote_count > votesforwinner:
        votesforwinner = vote_count
        winner = person

dashbreak = "-------------------------"


print("Election Results")
print(dashbreak)
print(f"Total Votes: {total_votes}")
print(dashbreak)
for person, vote_count in votes.items():
    print(f"{person}: {percentagesc[person]} ({vote_count})")
print(dashbreak)
print(f"Winner: {winner}")
print(dashbreak)

with open("Election Results.txt","w") as txtfile:
   txtfile.write("Election Results" + "\n")
   
   txtfile.write("--------------------------------" + "\n")
   txtfile.write(str(total_votes)  + "\n")
   txtfile.write("---------------------------------" + "\n")

   for person, vote_count in votes.items():
       txtfile.write(str(person) + ": " + str( "{:2.3f}".format(vote_count/total_votes))  + "% (" + str(vote_count) + ")\n")

   txtfile.write("--------------------------------" + "\n")
   txtfile.write(str(winner)  + "\n")
   txtfile.write("--------------------------------" + "\n")

   txtfile.close()
