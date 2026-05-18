from collections import defaultdict

class ServiceGraph:
    def __init__(self):
        self.graph = defaultdict(list)
        self.services = set()


    def load_services(self, filename):
        with open(filename, 'r') as file:
            for line in file:
                line = line.strip()

                if not line:
                    continue

                parent, child = line.split(':')

                self.graph[parent].append(child)

                self.services.add(parent)
                self.services.add(child)


    def dfs(self, node, visited, stack):
        visited.add(node)

        for neighbor in self.graph[node]:
            if neighbor not in visited:
                self.dfs(neighbor, visited, stack)

        stack.append(node)


    def topological_sort(self):
        visited = set()
        stack = []

        for service in self.services:
            if service not in visited:
                self.dfs(service, visited, stack)

        stack.reverse()

        return stack
    

    def detect_cycle_util(self, node, visited, rec_stack, path):

        visited.add(node)
        rec_stack.add(node)
        path.append(node)

        for neighbor in self.graph[node]:

            if neighbor not in visited:
                result = self.detect_cycle_util(
                    neighbor,
                    visited,
                    rec_stack,
                    path
                )

                if result:
                    return result

            elif neighbor in rec_stack:
                cycle_start = path.index(neighbor)
                return path[cycle_start:] + [neighbor]

        rec_stack.remove(node)
        path.pop()

        return None


    def detect_cycle(self):

        visited = set()
        rec_stack = set()

        for service in self.services:

            if service not in visited:

                cycle = self.detect_cycle_util(
                    service,
                    visited,
                    rec_stack,
                    []
                )

                if cycle:
                    return cycle

        return None


g = ServiceGraph()
g.load_services("services.txt")


cycle = g.detect_cycle()

if cycle:
    print("\nCYCLE DETECTED:")
    print(" -> ".join(cycle))
else:
    print("\nNo cycle found")