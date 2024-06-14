# jlee2621-ScreenMe
 DECO2017 Advanced Web Design | Web App Prototype

 **Overview**

Keeping track of our viewing habits in this vast landscape can be challenging, with the widespread availability of movies on multiple streaming platforms it substaintially transformed the way we consume media has changed significantly. This is where ScreenMe comes into play: as a sophisticated yet user-friendly web application meticulously fashioned to enhance and personalize movie-watching experience. ScreenMe effectively assists users in monitoring, structuring, and refining their media consumption patterns. Whether you're a casual viewer or a dedicated movie fan, ScreenMe caters as the premier companion in navigating the perpetually evolving domain of digital entertainment. Making it an invaluable asset for individuals who want to maintain an informed awareness of their viewing habits.


**Features**

***Bookmarking***
Users can now add or remove desired movies to manage their viewing experience.

***Insights***
ScreenMe will be integrated in partnership with online streaming services, accommodating entries for every movie viewed and reflecting comprehensive insights through the types of genres. The dynamically recorded history will keep individuals informed of their preferences, ensuring they don't miss out on new content with the same context.  

***Personalised recommendations*** 
Integrating the sophisticated algorithm, ScreenMe offers tailored recommendations with individual preferences, history, and interactions to enhance an overall viewing experience. 

***Discovering content***
A comprehensive description on individual movie allows users to explore the essential information of the moview, alongside with reviews and ratings that helps informed user decisions and assess if that movie fits their interest. 


**Usage:**

Open the jlee2621-ScreenMe folder 'index.html', run the server through the terminal with the command 'npm run start' and open your web browser with the provided link 'http://localhost:3000'.
1. Navigate through movies with recommendations for you, newly released and top-rated during the week. 
2. Bookmark your favourite movies on your individual watchlist and aid ScreenMe to tailor higher accuracy in suggestions to your taste.
3. Remove bookmark item from the watchlist anytime.
4. Explore different genres of movies, ScreenMe will manually update your viewing history to help you understand your preferences. 

**Version control**
The ScreenMe web application utilises the Github repository to commit, update and monitor the progress. 
You may access the Github repository at "https://github.com/jaydenleejl/jlee2621-ScreenMe.git"

**Setup**
No setup is required to run Screen Me. 

**Limitations**

This project encountered several limitations which influenced the final implementation and feature set:

- ***Complications in Tracking Dramas or Series***: Given the complex nature of dramas or series, indiciating their varying number of episodes and narrative complexity, accurately tracking and categorizing them posed a challenge with the tight timeline.

- ***Algorithm recommendations with the like & dislike feature***: Establishing a functional and accurate algorithm to effectively utilise a 'like' and 'dislike' feature proved difficult. The challenge in capturing user preferences in an accurate manner led to the decision to remove this feature from the current implementation.

- ***Dataset Complexity and Size Requirements***: The project initially aimed to utilize complex datasets to reflect a wide range of user preferences based on their viewing history across different genres. However, the enormity of the required datasets presented challenges in terms of processing and analysis. To manage this, the scope was adjusted to focus more narrowly on variations in users' watching history, specifically regarding genre preferences.

The constraints, despite impacting the project's breadth and feature offerings, have yielded valuable insights and learning opportunities. They have also facilitated the identification of crucial areas for future development and improvement.

**Development**
![old](https://github.com/jaydenleejl/jlee2621-ScreenMe/assets/141607881/a9ff68d1-b993-4845-aeeb-a3bf95ff1790)
![new-01](https://github.com/jaydenleejl/jlee2621-ScreenMe/assets/141607881/8235b468-ad6b-4d00-a9a7-4e1a0cf0648e)
![new-02](https://github.com/jaydenleejl/jlee2621-ScreenMe/assets/141607881/2ef69a7c-e208-419a-af03-10e82b63a5c2)

In the course of developing the web app, several adjustments were imperative due to the identified limitations. 

- ***Strategic Shift to Movie Tracking:*** Initially, our ambition was to create a comprehensive drama/series tracker. However, the intricate complexities associated with accurately tracking and categorising dramas or series, especially considering their varying episode counts and narrative depth, presented significant challenges. Coupled with the tight development timeline, it became clear that pivoting towards a movie tracking system was a more viable approach. 

- ***Enhanced Focus on Core Data Elements:*** Recognising the challenges posed by dataset complexity and the initial ambition to utilise extensive datasets for capturing a broad spectrum of user preferences, we streamlined our focus. By honing in on core dataset elements, such as user bookmarks, we aimed to cultivate a deeper understanding of user preference patterns. This strategic narrowing of scope has enabled us to tailor our recommendations with increasing accuracy, ensuring that we progressively refine our system's ability to cater to individual user tastes.

- ***Commitment Action Storage Mechanism:*** In response to the challenges faced in integrating a robust 'like' and 'dislike' feature due to the nuances of capturing user preferences accurately, we enhanced our system's interaction model. We implemented a mechanism whereby each action performed within the same session is actively stored. This ensures that with each page refresh, all user commitments remain intact, eliminating the need for users to recall and re-select their previous choices. 
