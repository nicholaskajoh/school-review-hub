from django.core.management.base import BaseCommand
from api.tests.factories import SchoolFactory

class Command(BaseCommand):
    help = "Populate database with schools"
        
    def handle(self, *args, **options):
        for x in range(30):
            school = SchoolFactory()
            self.stdout.write(self.style.SUCCESS("{} added!".format(school.name)))
        self.stdout.write(self.style.SUCCESS("\n30 schools added, seeding complete!"))