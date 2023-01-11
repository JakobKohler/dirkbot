# with open("the_holy_bible_experimental.txt", "r", encoding="utf-8") as rf:
#     data = rf.read()
#     data = data.replace('\n','')
#     data = data.replace('.','.\n')
    
# with open("the_holy_bible_experimental_new.txt", "w", encoding="utf-8") as wf:
#     wf.write(data)


with open("the_holy_bible_experimental.txt", "r", encoding="utf-8") as rf:
    lines = rf.readlines()
    
with open("the_holy_bible_experimental_new.txt", "w", encoding="utf-8") as wf:
    for line in lines:
            if len(line)>20:
                if(line.startswith(("","Abbildung", "Tabelle",
                                    "1.","2.","3.","4.","5.","6.","7.","8.","9.","10.","11.","12.",
                                    "downloaded from www.hanser-elibrary.com", "For personal use only"))==0):
                    wf.write(line)