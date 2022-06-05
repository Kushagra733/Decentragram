pragma solidity >=0.4.21 <=0.8.14;
contract Decentragram {


            struct image{
                uint ID;
                string ipfs;
                uint votes;
            }
            uint public totalImages=0;
            image[] public posts;
            
            function putPost(string memory ipfslink) public {
                posts.push(image(totalImages,ipfslink,0));
                totalImages++;
            }
            function likePost(uint _id) public {

                posts[_id].votes++;

            }


}