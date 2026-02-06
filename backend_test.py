import requests
import sys
import json
from datetime import datetime

class PodcastJournalAPITester:
    def __init__(self, base_url="https://podcast-journal.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.created_group_id = None

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                    return True, response_data
                except:
                    return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"   Error: {error_data}")
                except:
                    print(f"   Error: {response.text}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test("Root API", "GET", "", 200)

    def test_create_group(self):
        """Test creating a new group"""
        test_data = {
            "group_name": f"Test Group {datetime.now().strftime('%H%M%S')}",
            "members": ["Student 1", "Student 2", "Student 3"],
            "project_type": "podcast"
        }
        success, response = self.run_test("Create Group", "POST", "groups", 200, test_data)
        if success and 'id' in response:
            self.created_group_id = response['id']
            print(f"   Created group ID: {self.created_group_id}")
            # Verify project_type is set correctly
            if response.get('project_type') == 'podcast':
                print(f"   ✅ Project type correctly set to: {response['project_type']}")
            else:
                print(f"   ❌ Project type incorrect: {response.get('project_type')}")
        return success

    def test_create_duplicate_group(self):
        """Test creating a group with duplicate name"""
        test_data = {
            "group_name": "Duplicate Test Group",
            "members": ["Student A", "Student B"]
        }
        # Create first group
        self.run_test("Create First Group", "POST", "groups", 200, test_data)
        # Try to create duplicate
        return self.run_test("Create Duplicate Group", "POST", "groups", 400, test_data)

    def test_get_all_groups(self):
        """Test getting all groups"""
        return self.run_test("Get All Groups", "GET", "groups", 200)

    def test_get_specific_group(self):
        """Test getting a specific group by ID"""
        if not self.created_group_id:
            print("❌ No group ID available for testing")
            return False
        return self.run_test("Get Specific Group", "GET", f"groups/{self.created_group_id}", 200)

    def test_get_nonexistent_group(self):
        """Test getting a non-existent group"""
        fake_id = "nonexistent-id-12345"
        return self.run_test("Get Non-existent Group", "GET", f"groups/{fake_id}", 404)

    def test_update_day_data(self):
        """Test updating day data for a group"""
        if not self.created_group_id:
            print("❌ No group ID available for testing")
            return False
        
        # Test Day 1 update
        day1_data = {
            "day": 1,
            "data": {
                "topic": "Test Topic",
                "alternative_topics": "Alternative topics here",
                "why_this_topic": "Because it's interesting",
                "what_to_communicate": "Important message",
                "completed": False
            }
        }
        success1 = self.run_test("Update Day 1", "PUT", f"groups/{self.created_group_id}/day", 200, day1_data)
        
        # Test Day 2 update
        day2_data = {
            "day": 2,
            "data": {
                "sources": "Wikipedia, books, interviews",
                "learnings": "Learned many things",
                "target_audience": "Young adults",
                "completed": True
            }
        }
        success2 = self.run_test("Update Day 2", "PUT", f"groups/{self.created_group_id}/day", 200, day2_data)
        
        # Test Day 3 update (NEW - Grammar checklist and vocabulary)
        day3_data = {
            "day": 3,
            "data": {
                "introduction": "Hook your audience with this intro",
                "development": "Main content development",
                "conclusion": "Call to action conclusion",
                "grammar_present_perfect": True,
                "grammar_comparatives": True,
                "grammar_connectors": False,
                "grammar_passive_voice": True,
                "key_vocabulary": "climate, environment, sustainability, pollution, renewable",
                "vocabulary_definitions": "Climate: weather conditions, Environment: surroundings",
                "language_style": "Formal and persuasive",
                "completed": False
            }
        }
        success3 = self.run_test("Update Day 3 (Grammar & Vocabulary)", "PUT", f"groups/{self.created_group_id}/day", 200, day3_data)
        
        # Test Day 4 update (NEW - Script and visual planning)
        day4_data = {
            "day": 4,
            "data": {
                "draft_script": "[INTRO] Welcome to our podcast about climate change...",
                "visual_sketch": "Scene 1: Studio setup with microphones, Scene 2: Interview setup",
                "estimated_duration": "4 minutes 30 seconds",
                "completed": False
            }
        }
        success4 = self.run_test("Update Day 4 (Script & Visual)", "PUT", f"groups/{self.created_group_id}/day", 200, day4_data)
        
        # Test Day 5 update (NEW - Production)
        day5_data = {
            "day": 5,
            "data": {
                "rehearsal_notes": "Need to work on timing and transitions",
                "production_tools": "Audacity, GarageBand",
                "recording_date": "January 15, 2025",
                "final_script": "[FINAL] Welcome to our podcast...",
                "media_link": "https://youtube.com/watch?v=test123",
                "completed": False
            }
        }
        success5 = self.run_test("Update Day 5 (Production)", "PUT", f"groups/{self.created_group_id}/day", 200, day5_data)
        
        # Test Day 6 update (NEW - Reflection)
        day6_data = {
            "day": 6,
            "data": {
                "what_learned": "Learned about climate change and podcast production",
                "challenges_faced": "Timing was difficult, technical issues with recording",
                "team_collaboration": "Good teamwork, everyone contributed equally",
                "what_would_change": "Would plan better timing and have backup equipment",
                "overall_experience": "Very positive, would recommend to others",
                "completed": True
            }
        }
        success6 = self.run_test("Update Day 6 (Reflection)", "PUT", f"groups/{self.created_group_id}/day", 200, day6_data)
        
        return success1 and success2 and success3 and success4 and success5 and success6

    def test_update_invalid_day(self):
        """Test updating with invalid day number"""
        if not self.created_group_id:
            print("❌ No group ID available for testing")
            return False
        
        invalid_day_data = {
            "day": 7,  # Invalid day (now 6 days are valid)
            "data": {"test": "data"}
        }
        return self.run_test("Update Invalid Day", "PUT", f"groups/{self.created_group_id}/day", 400, invalid_day_data)

    def test_teacher_login_correct(self):
        """Test teacher login with correct password"""
        login_data = {"password": "profesor2024"}
        return self.run_test("Teacher Login (Correct)", "POST", "teacher/login", 200, login_data)

    def test_teacher_login_incorrect(self):
        """Test teacher login with incorrect password"""
        login_data = {"password": "wrongpassword"}
        return self.run_test("Teacher Login (Incorrect)", "POST", "teacher/login", 401, login_data)

    def test_delete_group(self):
        """Test deleting a group"""
        if not self.created_group_id:
            print("❌ No group ID available for testing")
            return False
        return self.run_test("Delete Group", "DELETE", f"groups/{self.created_group_id}", 200)

    def test_create_vlog_group(self):
        """Test creating a vlog group"""
        test_data = {
            "group_name": f"Vlog Group {datetime.now().strftime('%H%M%S')}",
            "members": ["Student A", "Student B"],
            "project_type": "vlog"
        }
        success, response = self.run_test("Create Vlog Group", "POST", "groups", 200, test_data)
        if success and response.get('project_type') == 'vlog':
            print(f"   ✅ Vlog project type correctly set")
            return True
        else:
            print(f"   ❌ Vlog project type incorrect: {response.get('project_type')}")
            return False

    def test_default_project_type(self):
        """Test that default project type is podcast when not specified"""
        test_data = {
            "group_name": f"Default Type Group {datetime.now().strftime('%H%M%S')}",
            "members": ["Student X", "Student Y"]
            # No project_type specified
        }
        success, response = self.run_test("Create Group (Default Type)", "POST", "groups", 200, test_data)
        if success and response.get('project_type') == 'podcast':
            print(f"   ✅ Default project type correctly set to podcast")
            return True
        else:
            print(f"   ❌ Default project type incorrect: {response.get('project_type')}")
            return False

    def test_delete_group(self):
        """Test deleting a group"""
        if not self.created_group_id:
            print("❌ No group ID available for testing")
            return False
        return self.run_test("Delete Group", "DELETE", f"groups/{self.created_group_id}", 200)

    def test_delete_nonexistent_group(self):
        """Test deleting a non-existent group"""
        fake_id = "nonexistent-id-12345"
        return self.run_test("Delete Non-existent Group", "DELETE", f"groups/{fake_id}", 404)

def main():
    print("🚀 Starting Podcast Journal API Tests")
    print("=" * 50)
    
    tester = PodcastJournalAPITester()
    
    # Run all tests
    tests = [
        tester.test_root_endpoint,
        tester.test_create_group,
        tester.test_create_vlog_group,
        tester.test_default_project_type,
        tester.test_create_duplicate_group,
        tester.test_get_all_groups,
        tester.test_get_specific_group,
        tester.test_get_nonexistent_group,
        tester.test_update_day_data,
        tester.test_update_invalid_day,
        tester.test_teacher_login_correct,
        tester.test_teacher_login_incorrect,
        tester.test_delete_group,
        tester.test_delete_nonexistent_group
    ]
    
    for test in tests:
        try:
            test()
        except Exception as e:
            print(f"❌ Test failed with exception: {str(e)}")
    
    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Final Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print(f"⚠️  {tester.tests_run - tester.tests_passed} tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())