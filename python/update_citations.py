import requests
import re
import yaml
import datetime
import sys


def parse_scholar(user):

    url = f'https://scholar.google.com/citations?user={user}'

    r = requests.get(url)

    hits = re.findall(r'<td class="gsc_rsb_std">(\d+)</td>', r.text)
    fields = ['citations', 'citations_recent', 'h_index', 'h_index_recent', 'i10_index', 'i10_index_recent']

    return dict(zip(fields, hits))


if __name__ == "__main__":
    data = parse_scholar("4niBmJUAAAAJ&hl")

    file = sys.argv[1]
    print("Updating citations in", file)

    with open(file, "r") as fin:
        citation_data = yaml.safe_load(fin)
        citation_data['hindex'] = int(data['h_index'])
        citation_data['count'] = int(data['citations'])
        citation_data['i10index'] = int(data['i10_index'])
        citation_data['date'] = datetime.date.today().strftime("%d/%m/%Y")

    with open(file, "w") as fout:
        yaml.dump(citation_data, fout)
