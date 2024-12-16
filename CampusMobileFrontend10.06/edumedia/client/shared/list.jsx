import { FlashList } from "@shopify/flash-list";

const DATA = [
  {
    id:1,
    name: "First Item",
    username:"@firstItem",
    title: "This Looks Delicious",
    image: "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJvYXV0aCI6eyJjbGllbnRfaWQiOiJmcm9udGlmeS1leHBsb3JlciJ9LCJwYXRoIjoiaWhoLWhlYWx0aGNhcmUtYmVyaGFkXC9hY2NvdW50c1wvYzNcLzQwMDA2MjRcL3Byb2plY3RzXC8yMDlcL2Fzc2V0c1wvODNcLzM2OTEzXC81NzkwMzk3YmJmYWYyYWRjZWEwNDdkMWZiNmU2YWJiNS0xNjU4Mjk3ODQxLmpwZyJ9:ihh-healthcare-berhad:EaTxkiLVSo31Lz1tT9wRrPHlEk7X2W_LH-NxpoODzwE?format=webp",
    tags: "",
    likeCount: "",
    commentCount: "",
    createdTime: "2h"

  },
  {
    id:2,
    name: "First Item",
    username:"@firstItem",
    title: "This Looks Delicious",
    image: "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJvYXV0aCI6eyJjbGllbnRfaWQiOiJmcm9udGlmeS1leHBsb3JlciJ9LCJwYXRoIjoiaWhoLWhlYWx0aGNhcmUtYmVyaGFkXC9hY2NvdW50c1wvYzNcLzQwMDA2MjRcL3Byb2plY3RzXC8yMDlcL2Fzc2V0c1wvODNcLzM2OTEzXC81NzkwMzk3YmJmYWYyYWRjZWEwNDdkMWZiNmU2YWJiNS0xNjU4Mjk3ODQxLmpwZyJ9:ihh-healthcare-berhad:EaTxkiLVSo31Lz1tT9wRrPHlEk7X2W_LH-NxpoODzwE?format=webp",
    tags: "",
    likeCount: "",
    commentCount: "",
    createdTime: "2h"

  },
  {
    id:3,
    name: "First Item",
    username:"@firstItem",
    title: "This Looks Delicious",
    image: "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJvYXV0aCI6eyJjbGllbnRfaWQiOiJmcm9udGlmeS1leHBsb3JlciJ9LCJwYXRoIjoiaWhoLWhlYWx0aGNhcmUtYmVyaGFkXC9hY2NvdW50c1wvYzNcLzQwMDA2MjRcL3Byb2plY3RzXC8yMDlcL2Fzc2V0c1wvODNcLzM2OTEzXC81NzkwMzk3YmJmYWYyYWRjZWEwNDdkMWZiNmU2YWJiNS0xNjU4Mjk3ODQxLmpwZyJ9:ihh-healthcare-berhad:EaTxkiLVSo31Lz1tT9wRrPHlEk7X2W_LH-NxpoODzwE?format=webp",
    tags: "",
    likeCount: "",
    commentCount: "",
    createdTime: "2h"

  },
  {
    id:4,
    name: "First Item",
    username:"@firstItem",
    title: "This Looks Delicious",
    image: "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJvYXV0aCI6eyJjbGllbnRfaWQiOiJmcm9udGlmeS1leHBsb3JlciJ9LCJwYXRoIjoiaWhoLWhlYWx0aGNhcmUtYmVyaGFkXC9hY2NvdW50c1wvYzNcLzQwMDA2MjRcL3Byb2plY3RzXC8yMDlcL2Fzc2V0c1wvODNcLzM2OTEzXC81NzkwMzk3YmJmYWYyYWRjZWEwNDdkMWZiNmU2YWJiNS0xNjU4Mjk3ODQxLmpwZyJ9:ihh-healthcare-berhad:EaTxkiLVSo31Lz1tT9wRrPHlEk7X2W_LH-NxpoODzwE?format=webp",
    tags: "",
    likeCount: "",
    commentCount: "",
    createdTime: "2h"

  },
  {
    id:5,
    name: "First Item",
    username:"@firstItem",
    title: "This Looks Delicious",
    image: "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJvYXV0aCI6eyJjbGllbnRfaWQiOiJmcm9udGlmeS1leHBsb3JlciJ9LCJwYXRoIjoiaWhoLWhlYWx0aGNhcmUtYmVyaGFkXC9hY2NvdW50c1wvYzNcLzQwMDA2MjRcL3Byb2plY3RzXC8yMDlcL2Fzc2V0c1wvODNcLzM2OTEzXC81NzkwMzk3YmJmYWYyYWRjZWEwNDdkMWZiNmU2YWJiNS0xNjU4Mjk3ODQxLmpwZyJ9:ihh-healthcare-berhad:EaTxkiLVSo31Lz1tT9wRrPHlEk7X2W_LH-NxpoODzwE?format=webp",
    tags: "",
    likeCount: "",
    commentCount: "",
    createdTime: "2h"

  },
  {
    id:6,
    name: "First Item",
    username:"@firstItem",
    title: "This Looks Delicious",
    image: "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJvYXV0aCI6eyJjbGllbnRfaWQiOiJmcm9udGlmeS1leHBsb3JlciJ9LCJwYXRoIjoiaWhoLWhlYWx0aGNhcmUtYmVyaGFkXC9hY2NvdW50c1wvYzNcLzQwMDA2MjRcL3Byb2plY3RzXC8yMDlcL2Fzc2V0c1wvODNcLzM2OTEzXC81NzkwMzk3YmJmYWYyYWRjZWEwNDdkMWZiNmU2YWJiNS0xNjU4Mjk3ODQxLmpwZyJ9:ihh-healthcare-berhad:EaTxkiLVSo31Lz1tT9wRrPHlEk7X2W_LH-NxpoODzwE?format=webp",
    tags: "",
    likeCount: "",
    commentCount: "",
    createdTime: "2h"

  },
  {
    id:7,
    name: "First Item",
    username:"@firstItem",
    title: "This Looks Delicious",
    image: "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJvYXV0aCI6eyJjbGllbnRfaWQiOiJmcm9udGlmeS1leHBsb3JlciJ9LCJwYXRoIjoiaWhoLWhlYWx0aGNhcmUtYmVyaGFkXC9hY2NvdW50c1wvYzNcLzQwMDA2MjRcL3Byb2plY3RzXC8yMDlcL2Fzc2V0c1wvODNcLzM2OTEzXC81NzkwMzk3YmJmYWYyYWRjZWEwNDdkMWZiNmU2YWJiNS0xNjU4Mjk3ODQxLmpwZyJ9:ihh-healthcare-berhad:EaTxkiLVSo31Lz1tT9wRrPHlEk7X2W_LH-NxpoODzwE?format=webp",
    tags: "",
    likeCount: "",
    commentCount: "",
    createdTime: "2h"

  },
  {
    id:8,
    name: "First Item",
    username:"@firstItem",
    title: "This Looks Delicious",
    image: "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJvYXV0aCI6eyJjbGllbnRfaWQiOiJmcm9udGlmeS1leHBsb3JlciJ9LCJwYXRoIjoiaWhoLWhlYWx0aGNhcmUtYmVyaGFkXC9hY2NvdW50c1wvYzNcLzQwMDA2MjRcL3Byb2plY3RzXC8yMDlcL2Fzc2V0c1wvODNcLzM2OTEzXC81NzkwMzk3YmJmYWYyYWRjZWEwNDdkMWZiNmU2YWJiNS0xNjU4Mjk3ODQxLmpwZyJ9:ihh-healthcare-berhad:EaTxkiLVSo31Lz1tT9wRrPHlEk7X2W_LH-NxpoODzwE?format=webp",
    tags: "",
    likeCount: "",
    commentCount: "",
    createdTime: "2h"

  },
  {
    id:9,
    name: "First Item",
    username:"@firstItem",
    title: "This Looks Delicious",
    image: "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJvYXV0aCI6eyJjbGllbnRfaWQiOiJmcm9udGlmeS1leHBsb3JlciJ9LCJwYXRoIjoiaWhoLWhlYWx0aGNhcmUtYmVyaGFkXC9hY2NvdW50c1wvYzNcLzQwMDA2MjRcL3Byb2plY3RzXC8yMDlcL2Fzc2V0c1wvODNcLzM2OTEzXC81NzkwMzk3YmJmYWYyYWRjZWEwNDdkMWZiNmU2YWJiNS0xNjU4Mjk3ODQxLmpwZyJ9:ihh-healthcare-berhad:EaTxkiLVSo31Lz1tT9wRrPHlEk7X2W_LH-NxpoODzwE?format=webp",
    tags: "",
    likeCount: "",
    commentCount: "",
    createdTime: "2h"

  },
  {
    id:10,
    name: "First Item",
    username:"@firstItem",
    title: "This Looks Delicious",
    image: "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJvYXV0aCI6eyJjbGllbnRfaWQiOiJmcm9udGlmeS1leHBsb3JlciJ9LCJwYXRoIjoiaWhoLWhlYWx0aGNhcmUtYmVyaGFkXC9hY2NvdW50c1wvYzNcLzQwMDA2MjRcL3Byb2plY3RzXC8yMDlcL2Fzc2V0c1wvODNcLzM2OTEzXC81NzkwMzk3YmJmYWYyYWRjZWEwNDdkMWZiNmU2YWJiNS0xNjU4Mjk3ODQxLmpwZyJ9:ihh-healthcare-berhad:EaTxkiLVSo31Lz1tT9wRrPHlEk7X2W_LH-NxpoODzwE?format=webp",
    tags: "",
    likeCount: "",
    commentCount: "",
    createdTime: "2h"

  },
];

function List({renderItem, data}) {
  return (
    <FlashList
      data={ data ? data : DATA}
      renderItem={(data) => renderItem(data)}
      estimatedItemSize={200}
      contentContainerStyle={{ paddingBottom: 150 }}

    />
  );
}

export default List