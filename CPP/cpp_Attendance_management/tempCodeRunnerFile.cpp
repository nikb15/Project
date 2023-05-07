int admin_view()
// {
//     int goBack = 0;
//     while(1)
//     {
//         system("cls");
//         cout<<"\n 1 Register a student";
//         cout<<"\n 2 Delete all student name registered";
//         cout<<"\n 3 Delete student by roll number";
//         cout<<"\n 4 Check list of student registered by username";
//         cout<<"\n 5 Check presence count of any student by roll no";
//         cout<<"\n 6 Get list of student with their attendance count";
//         cout<<"\n 0 Go Back <-\n";
//         int choice;
//         cout<<"\n Enter your choice: ";
//         cin>>choice;

//         cout<<"\n Enter your choice: ";
//         cin>>choice;

//         switch(choice)
//         {
//         case 1:
//             register_student();
//             break;
//         case 2:
//             delete_all_students();
//             break;
//         case 3:
//             delete_student_by_rollno();
//             break;
//         case 4:
//             check_list_of_all_students_registered();
//             break;
//         case 5:
//             check_presence_count_by_rollno();
//             break;
//         case 6:
//             get_list_of_students_with_their_presence_count();
//             break;
//         case 0:
//             goBack = 1;
//             break;
//         default:
//             cout<<"\n Invalid choice. Enter again";
//             getchar();
//         }
//         if(goBack==1)
//         {
//             break;
//         }
//     }
//     return 0;
// }