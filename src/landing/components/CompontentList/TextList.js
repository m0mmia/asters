import React from "react";
import { Title1, Title2, Title3, Title4, Title5, Title6, Title7,Text1, Text2, Text3, Text4, Text5, Text6} from "../Text";

const sampleText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae nunc ut mi laoreet pulvinar. Suspendisse non malesuada risus. Proin ut malesuada purus. Mauris venenatis, augue sed accumsan accumsan, lorem neque rhoncus nisi, sed dignissim diam lorem ac tellus. Nam convallis nec sapien condimentum ultrices. Aliquam a vestibulum dolor, sit amet blandit ex. Nam in lacinia elit. Praesent consequat varius consequat. Mauris sed nisi vel lorem mattis dictum ac vitae nulla'
 
export default () => {
    return (
      <div>
          <h2>Text:</h2>
          <hr/>
              <h3>Title 1:</h3>
              <Title1>
                  Discover the new 
               </Title1> 
               <Title1>
                    Karl Kani ‘89
               </Title1> 
          <hr/>
          <hr/>
              <h3>Title 2:</h3>
              <Title2>
                  <span>Discover the new </span>
                  <span>Karl Kani ‘89</span>
               </Title2> 
          <hr/>
          <hr/>
              <h3>Title 3:</h3>
              <Title3>
                  <span>Discover the new </span>
                  <span>Karl Kani ‘89</span>
               </Title3> 
          <hr/>
          <hr/>
              <h3>Title 4:</h3>
              <Title4>
                  <span>Discover the new </span>
                  <span>Karl Kani ‘89</span>
               </Title4> 
          <hr/>
          <hr/>
              <h3>Title 5:</h3>
              <Title5>
                  <span>Discover the new </span>
                  <span>Karl Kani ‘89</span>
               </Title5> 
          <hr/>

          <hr/>
              <h3>Title 6:</h3>
              <Title6>
                  <span>Discover the new </span>
                  <span>Karl Kani ‘89</span>
               </Title6> 
          <hr/>

          <hr/>
              <h3>Title 7:</h3>
              <Title7>
                  <span>Discover the new </span>
                  <span>Karl Kani ‘89</span>
               </Title7> 
          <hr/>

          <hr/>
              <h3>Text 1:</h3>
              <Text1>
                    {sampleText}
               </Text1> 
          <hr/>
          <hr/>
            <h3>Text 2:</h3>
              <Text2>
              {sampleText}
               </Text2>           <hr/>
          <hr/>
          <h3>Text 3:</h3>
              <Text3>
              {sampleText}
               </Text3>              
             <hr/>
             <hr/>
          <h3>Text 4:</h3>
              <Text4>
              {sampleText}
               </Text4>              
             <hr/>
             <hr/>
          <h3>Text 5:</h3>
              <Text5>
              {sampleText}
               </Text5>              
             <hr/>
             <hr/>
          <h3>Text 6:</h3>
              <Text6>
              {sampleText}
               </Text6>              
             <hr/>
             <hr/>
      </div>
    );
  }