import csv
from py2neo import Graph, authenticate
import time

authenticate("localhost:7474", "neo4j", "neo4j") #by default authentication. Set username and password for your configuration
graph = Graph("http://localhost:7474/db/data/")
graph.delete_all()


def main():

    sample_file = "sample.ifc.nq"
    graph = Graph("http://localhost:7474/db/data/")
    with open(sample_file, 'r+') as in_file:

        reader = csv.reader(in_file, delimiter=' ')
        next(reader, None)
        batch = graph.cypher.begin()

        try:
            i = 0
            j = 0
            for row in reader:
                if row:
                    subject_node = strip(row[0])
                    predicate = strip(row[1])
                    object_node = strip(row[2])

                    query = """
                        merge (subject:SUBJECT {subject_node:{a}})
                        merge (object: OBJECT {object_node:{c}})
                        merge (subject)-[:predicate{predicate:{b}}]-(object)

                        """

                    batch.append(query, {"a": subject_node, "b": predicate, "c": object_node})
                    i += 1
                    j += 1
                    batch.process()
                    if (i == 1000): #submits a batch every 1000 lines read
                        batch.commit()
                        print j, "lines processed"
                        i = 0
                        batch = graph.cypher.begin()
            else: batch.commit() #submits remainder of lines read
            print j, "ifcRDF data processed"

        except Exception as e:
            print e, row, reader.line_num

def strip(string): return''.join([c if 0 < ord(c) < 128 else ' ' for c in string]) #removes non utf-8 chars from string within cell

if __name__ == '__main__':

    start = time.time()
    main()
    end = time.time() - start
    print "ifcRDF2Neo4j conversion completed in:", end, "seconds"