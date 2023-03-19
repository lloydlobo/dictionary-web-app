import { Results } from "@/pages";
import { Dictionary } from "@/utils/sample-dict";
import { Tab } from "@headlessui/react";

export function MyTabs(props: { results: Dictionary | null; keyword: string }) {
  return (
    <section className="grid py-4 place-self-start">
      <Tab.Group >
        <Tab.List>
          <Tab>Text</Tab>
          <Tab>JSON</Tab>
          <Tab>Feeling Lucky</Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <>
              <Results results={props.results} keyword={props.keyword} />
            </>
          </Tab.Panel>
          <Tab.Panel>
            <>
              {props.results ? <span>{props.results.word} </span> : <>Oops</>}
            </>
          </Tab.Panel>
          <Tab.Panel>
            <a href="https://google.com/search?q=Love">I am feeling lucky!</a>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </section>
  );
}
